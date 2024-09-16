import Peer from "peerjs";

export default function PeerConfig(id) {
    //const p = new Peer(id);
    const p = new Peer(id, {
        config: {
            iceServers: [
                {
                    urls: "stun:stun.relay.metered.ca:80",
                },
                {
                    urls: "turn:global.relay.metered.ca:80",
                    username: "d40aac2376e8e7d4791e8d10",
                    credential: "Rjm64rDTpq3dz4EJ",
                },
                {
                    urls: "turn:global.relay.metered.ca:80?transport=tcp",
                    username: "d40aac2376e8e7d4791e8d10",
                    credential: "Rjm64rDTpq3dz4EJ",
                },
                {
                    urls: "turn:global.relay.metered.ca:443",
                    username: "d40aac2376e8e7d4791e8d10",
                    credential: "Rjm64rDTpq3dz4EJ",
                },
                {
                    urls: "turns:global.relay.metered.ca:443?transport=tcp",
                    username: "d40aac2376e8e7d4791e8d10",
                    credential: "Rjm64rDTpq3dz4EJ",
                },
            ],
        }
    });

    return p;
}