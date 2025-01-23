import { Server } from "../../app/server_app/server/Server";
import { Authorizer } from "../../app/server_app/auth/Authorizer";
import { RegisterHandler } from "../../app/server_app/handlers/RegisterHandler";
import { LoginHandler } from "../../app/server_app/handlers/LoginHandler";
import {ReservationsHandler} from "../../app/server_app/handlers/ReservationsHandler";
import {ReservationsDataAccess} from "../../app/server_app/data/ReservationsDataAccess";
import {HTTP_CODES} from "../../app/server_app/model/ServerModel";

jest.mock("../../app/server_app/auth/Authorizer");
jest.mock("../../app/server_app/data/ReservationsDataAccess");
jest.mock("../../app/server_app/handlers/LoginHandler");
jest.mock("../../app/server_app/handlers/RegisterHandler");
jest.mock("../../app/server_app/handlers/ReservationsHandler");

const requestMock = {
    url: '',
    headers: {
        'user-agent': '',
    },
}

const responseMock = {
    end: jest.fn(),
    writeHead: jest.fn(),
}

const serverMock = {
    listen: jest.fn(),
    close: jest.fn(),
}

jest.mock("http", () => ({
    createServer: (cb: Function) => {
        cb(requestMock, responseMock);
        return serverMock;
    },
}));

describe('Server test suite', () => {


    let sut: Server;

    beforeEach(() => {
        sut = new Server();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should start server on port 8080 and end the request', async () => {
        await sut.startServer();

        expect(serverMock.listen).toHaveBeenCalledWith(8080);
        expect(responseMock.end).toHaveBeenCalledTimes(1);
    })

    it('should handle register requests', async () => {
        requestMock.url = 'localhost:8080/register';
        const  handleRequestSpy = jest.spyOn(RegisterHandler.prototype, 'handleRequest')
        await sut.startServer();

        expect(handleRequestSpy).toHaveBeenCalledTimes(1);
        expect(RegisterHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer));
    })

    it('should handle register requests', async () => {
        requestMock.url = 'localhost:8080/login';
        const  handleRequestSpy = jest.spyOn(LoginHandler.prototype, 'handleRequest')
        await sut.startServer();

        expect(handleRequestSpy).toHaveBeenCalledTimes(1);
        expect(LoginHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer));
    })

    it('should handle reservation requests', async () => {
        requestMock.url = 'localhost:8080/reservation';
        const  handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')
        await sut.startServer();

        expect(handleRequestSpy).toHaveBeenCalledTimes(1);
        expect(ReservationsHandler).toHaveBeenCalledWith(
            requestMock,
            responseMock,
            expect.any(Authorizer),
            expect.any(ReservationsDataAccess)
        );
    })

    it('should do nothing for not supported request', async () => {
        requestMock.url = 'localhost:8080/someRandomRoute';
        const validateToken = jest.spyOn(Authorizer.prototype, 'validateToken')
        await sut.startServer();

        expect(validateToken).not.toHaveBeenCalled()
    })

    it('should throw error', async () => {
        requestMock.url = 'localhost:8080/reservation';
        const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')

        handleRequestSpy.mockRejectedValueOnce(
            new Error('Some error')
        )

        await sut.startServer();

        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.INTERNAL_SERVER_ERROR,
            JSON.stringify(`Internal server error: Some error`)
        )
    })

    // it('should stop the server if started',async () => {
    //     await sut.startServer();
    //
    //     await sut.stopServer();
    //
    //     expect(serverMock.close).toHaveBeenCalled();
    // })

})