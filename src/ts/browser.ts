function testJavascript() {
    document.getElementById('javascript-result')!.innerHTML = "&#x2705";
}

function testWebAssembly() {
    try {
        if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
            document.getElementById('wasm-result')!.innerHTML =  "&#x2705";
        } else {
            document.getElementById('wasm-result')!.innerHTML = "&#x274C";
        }
    }
    catch {
        document.getElementById('wasm-result')!.innerHTML = "&#x274C";
    }
}

function testWebSockets() {
    var webSocket = new WebSocket('wss://echo.websocket.org');
    webSocket.onopen = (event) => {
        document.getElementById('websocket-result')!.innerHTML = "&#x2705";
        webSocket.close();
    }
    webSocket.onerror = (event) => {
        document.getElementById('websocket-result')!.innerHTML = "&#x274C";
    }
}
