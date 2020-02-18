import openSocket from 'socket.io-client';
const socketObj = {
  socket: null,
};
export const initSocket = () => {
  socketObj.socket = openSocket(process.env.BASE_URL);
};

export default socketObj;
