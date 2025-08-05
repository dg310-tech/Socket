// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8001 });

let baseLat = 18.515166;
let baseLong = 73.925737;

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'ping') {
        console.log('Received ping from client');
      }
    } catch (err) {
      console.error('Error parsing message:', err);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });

  const sendTelemetry = () => {
    baseLat += (Math.random() - 0.5) * 0.0002;
    baseLong += (Math.random() - 0.5) * 0.0002;

    const payload = {
      telemetry: {
        "ain.1": 8,
        "can.engine.coolant.temperature": 29,
        "can.engine.oil.temperature": 22,
        "can.engine.rpm": 0,
        "channel.id": 1248918,
        "codec.id": 8,
        "device.id": 6282693,
        "device.name": "Piyush Test Device",
        "device.type.id": 19,
        "engine.ignition.status": false,
        "event.priority.enum": 0,
        "external.powersource.voltage": 26.631,
        "gsm.cellid": 57417,
        "gsm.lac": 39612,
        "gsm.signal.level": 100,
        "harsh.cornering.event": true,
        ident: "123467789769876",
        "movement.status": false,
        peer: "106.222.213.13:28625",
        position: {
          altitude: 185,
          direction: 180,
          hdop: 5.2,
          latitude: baseLat,
          longitude: baseLong,
          pdop: 12.1,
          satellites: 2,
          speed: 0,
        },
        "position.altitude": 185,
        "position.direction": 180,
        "position.hdop": 5.2,
        "position.latitude": baseLat,
        "position.longitude": baseLong,
        "position.pdop": 12.1,
        "position.satellites": 2,
        "position.speed": 0,
        "protocol.id": 14,
        "server.timestamp": Date.now() / 1000,
        timestamp: Math.floor(Date.now() / 1000),
        "vehicle.mileage": 0,
        "x.acceleration": 0,
        "y.acceleration": 0,
        "z.acceleration": 0,
      },
      id: 6282693,
      enabled: false,
      name: "Piyush Test Device",
      configuration: {
        ident: "123467789769876",
        settings_polling: "once",
      },
    };

    ws.send(JSON.stringify(payload));
  };

  const interval = setInterval(sendTelemetry, 1500);
});

console.log('✅ WebSocket server is running on ws://localhost:8001');
