import StateService from "../services/stateService";
import { Socket }   from "socket.io";
import { State }    from "../interfaces/state";

const stateService = new StateService();

const socketIO = (server) => {

    const io = require('socket.io')(server);

    io.on('connection', (socket: Socket) => {

        // tslint:disable-next-line: no-console
        // console.info('\x1b[32m', `[WEBSOCKET] User connected on socket id ${ socket.id }`);

        socket.on('disconnect', (m: string) => {
            // tslint:disable-next-line: no-console
            // console.info('\x1b[31m', `[WEBSOCKET] User from socket ${socket.id} has been disconnected`);
        });

        socket.on('message', async ( state: State ) => {

            let hasError = false;
            let operation = 'created';

            try {

                operation = await stateService.transactionalUpsert(state);

            } catch (error) {

                hasError = error;

            } finally {

                io.to(socket.id).emit('messageResponse', { hasError, operation: hasError ? null : operation });

            }

        })

    });

}

export { socketIO };