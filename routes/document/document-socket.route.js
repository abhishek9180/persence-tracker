const express = require('express');
const router = express.Router();

const userService = require('../../mongodb/services/user.service');
const documentService = require('../../mongodb/services/document-user.service');

module.exports = function (app, io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('Connected: ', socket.id);

        /**
        * get the active users
        */
        socket.on('get-active-users', (data) => {
            console.log("getting active user: ", data.userId);
            let activeUsers = {};
            if (!data.userId || data.userId == '') {
                activeUsers.error = true;
                activeUsers.message = `User does not exits.`;
                io.emit('active-user-response', activeUsers);

            } else {
                userService.findUserById(data.userId).then(user => {
                    // remove password field
                    delete user.password;
                    documentService.getDocumentActiveUsers({ online: true, 'documentId': 1 }).then(documentUsers => {
                        // get current user
                        const currentUserIndex = documentUsers.findIndex(du => {
                            return du.user._id == data.userId;
                        });
                        let currentUser = null;
                        if (currentUserIndex > -1) {
                            currentUser = documentUsers[currentUserIndex];
                            // remove current user
                            documentUsers.splice(currentUserIndex, 1);
                        }
                        // send existing online users to logged in user
                        io.to(socket.id).emit('active-user-response', {
                            error: false,
                            userConnected: true,
                            activeUsers: documentUsers
                        });
                        // append current socket id to doc user
                        let socketIds = [];
                        if (currentUser && currentUser.socketId && currentUser.socketId.length > 0) {
                            socketIds = currentUser.socketId;
                        }
                        // add current socket id
                        socketIds.push(socket.id);
                        const userPayload = { online: true, documentId: 1, lastActiveTime: Date.now(), socketId: socketIds }
                        // set logged in user as online user
                        documentService.updateOrCreateUserDocumentByQuery({ user: data.userId }, userPayload).then(documentUser => {
                            if (documentUsers && documentUsers.length > 0) {
                                // send loggedin user details to other active users
                                documentUsers.forEach((du) => {
                                    if (du.socketId.length > 0) {
                                        du.socketId.forEach(id => {
                                            io.to(id).emit('active-user-response', {
                                                error: false,
                                                newUserConnected: true,
                                                activeUser: { socketId: socketIds, user: user }
                                            });
                                        })
                                    }
                                });
                                /* socket.broadcast.emit('active-user-response', {
                                    error: false,
                                    newUserConnected: true,
                                    activeUser: { socketId: socketIds, user: user }
                                }); */
                            }
                        }).catch(error => {
                            console.log("error in updating user status: ", error);
                        })
                    })

                }).catch(error => {
                    // Send error
                    io.to(socket.id).emit('active-user-response', {
                        error: true
                    });
                });
            }
        });

        /**
            * Logout the user
            */
        socket.on('logout', (data) => {
            io.to(socket.id).emit('logout-response', {
                error: false
            });
            socket.disconnect();
        });

        /**
        * sending the disconnected user to all socket users. 
        */
        socket.on('disconnect', () => {
            setTimeout(() => {
                console.log("[Disconnected]: disconnected");
                const query = { online: true, 'socketId': socket.id };
                documentService.getDocumentActiveUsers({ online: true, 'socketId': socket.id }).then(documentUsers => {
                    if (documentUsers && documentUsers.length > 0) {
                        try {
                            const currentSocketIndex = documentUsers[0].socketId.indexOf(socket.id);
                            if (currentSocketIndex > -1) {
                                // remove active socket id 
                                documentUsers[0].socketId.splice(currentSocketIndex, 1);
                                const data = {
                                    online: documentUsers[0].socketId.length > 0 ? true : false,
                                    socketId: documentUsers[0].socketId,
                                    lastActiveTime: Date.now()
                                };
                                documentService.updateUserDocumentByQuery(query, data).then(res => {
                                    socket.broadcast.emit('active-user-response', {
                                        error: false,
                                        userDisconnected: true,
                                        socketId: socket.id
                                    });
                                }).catch(error => {
                                    console.log("error in getting user doc: ", error);
                                })
                            }

                        } catch (error) {
                            console.log("Error: ", error);
                        }
                    }
                });


            }, 1000);
        });

        //End ON Events
        return router;
    });
}