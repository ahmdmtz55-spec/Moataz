const userId = "1107752253663739984";

function openLink(url) {
    window.open(url, "_blank");
}

const ws = new WebSocket("wss://api.lanyard.rest/socket");

ws.onopen = () => {
    ws.send(JSON.stringify({
        op: 2,
        d: { subscribe_to_id: userId }
    }));
};

ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data).d;
    if (!data) return;

    /* ===== الاسم الحقيقي ===== */
    const displayName =
        data.discord_user.global_name || data.discord_user.username;

    document.getElementById("d-name").innerText = displayName;

    /* ===== اليوزر ===== */
    document.getElementById("d-username").innerText =
        "   " + data.discord_user.username;

    /* ===== الصورة ===== */
    document.getElementById("d-avatar").src =
        `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;

    /* ===== الحالة ===== */
    const statusMap = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline"
    };

    const dot = document.getElementById("status-dot");
    const text = document.getElementById("status-text");

    const status = data.discord_status;

    dot.className = "dot " + status;
    text.innerText = statusMap[status] || "Offline";
};
