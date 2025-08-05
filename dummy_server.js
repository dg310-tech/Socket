const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8002 });

console.log('✅ WebSocket server is running on ws://localhost:8002');

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

  let baseLat = 18.515166;
  let baseLong = 73.925737;

  const sendTelemetry = () => {
    // Simulate GPS drift
    baseLat += (Math.random() - 0.5) * 0.0005;
    baseLong += (Math.random() - 0.5) * 0.0005;

    const payload = {
      telemetry: {
        "ain.1": Math.floor(Math.random() * 10),
        "can.engine.coolant.temperature": 70 + Math.floor(Math.random() * 20),
        "can.engine.oil.temperature": 60 + Math.floor(Math.random() * 15),
        "can.engine.rpm": Math.floor(Math.random() * 6000),
        "channel.id": 1000000 + Math.floor(Math.random() * 10000),
        "codec.id": 8,
        "device.id": 6282693,
        "device.name": "Piyush Test Device",
        "device.type.id": 19,
        "engine.ignition.status": Math.random() > 0.5,
        "event.priority.enum": Math.floor(Math.random() * 4),
        "external.powersource.voltage": parseFloat((24 + Math.random() * 4).toFixed(3)),
        "gsm.cellid": Math.floor(Math.random() * 100000),
        "gsm.lac": Math.floor(Math.random() * 50000),
        "gsm.signal.level": Math.floor(Math.random() * 100),
        "harsh.cornering.event": Math.random() > 0.9,
        ident: "123467789769876",
        "movement.status": Math.random() > 0.5,
        peer: "106.222.213.13:28625",
        position: {
          altitude: 100 + Math.floor(Math.random() * 200),
          direction: Math.floor(Math.random() * 360),
          hdop: parseFloat((Math.random() * 5).toFixed(2)),
          latitude: parseFloat(baseLat.toFixed(6)),
          longitude: parseFloat(baseLong.toFixed(6)),
          pdop: parseFloat((5 + Math.random() * 10).toFixed(1)),
          satellites: Math.floor(Math.random() * 12),
          speed: Math.floor(Math.random() * 120),
        },
        "position.altitude": 100 + Math.floor(Math.random() * 200),
        "position.direction": Math.floor(Math.random() * 360),
        "position.hdop": parseFloat((Math.random() * 5).toFixed(2)),
        "position.latitude": parseFloat(baseLat.toFixed(6)),
        "position.longitude": parseFloat(baseLong.toFixed(6)),
        "position.pdop": parseFloat((5 + Math.random() * 10).toFixed(1)),
        "position.satellites": Math.floor(Math.random() * 12),
        "position.speed": Math.floor(Math.random() * 120),
        "protocol.id": 14,
        "server.timestamp": Date.now() / 1000,
        timestamp: Math.floor(Date.now() / 1000),
        "vehicle.mileage": Math.floor(Math.random() * 100000),
        "x.acceleration": parseFloat((Math.random() * 2 - 1).toFixed(2)),
        "y.acceleration": parseFloat((Math.random() * 2 - 1).toFixed(2)),
        "z.acceleration": parseFloat((Math.random() * 2 - 1).toFixed(2)),
      },
      id: 6282693,
      enabled: Math.random() > 0.5,
      name: "Piyush Test Device",
      configuration: {
        ident: "123467789769876",
        settings_polling: "once",
      },
    };

    ws.send(JSON.stringify(payload));
  };

  const interval = setInterval(sendTelemetry, 1750);
});
