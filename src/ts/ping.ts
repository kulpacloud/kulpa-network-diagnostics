class Endpoint {
    public id: string;
    constructor(
        public name: string,
        public host: URL,
        public required: boolean
    ) {
        this.id = Math.random().toString();
    }
}

function getEndpoints(): Promise<Endpoint[]> {
    return fetch("hosts.json")
        .then(response => response.json() as Promise<Array<any>>)
        .then(json => json.map(element => {
            return new Endpoint(element.name, element.host, element.required);
        }));
}

getEndpoints()
    .then(endpoints => {
        let tableBody = document.getElementById("table-body");
        let html = "";

        endpoints.forEach(endpoint => {
            html += "<tr><td class='p-2 border border-slate-800'>" + endpoint.name + "</td><td class='p-2 border border-slate-800'>" + endpoint.host.toString() + "</td><td id='service_" + endpoint.id + "' class='p-2 border border-slate-800'>Testing...</td></tr>"
        });

        tableBody!.innerHTML = html;

        endpoints.forEach(endpoint => {
            fetch(new Request(endpoint.host, { method: 'GET', mode: 'no-cors', cache: "no-cache", keepalive: false }))
                .then(response => {
                    var cell = document.getElementById("service_" + endpoint.id);
                    cell!.innerHTML = "&#x2705";
                })
                .catch(reason => {
                    var cell = document.getElementById("service_" + endpoint.id);
                    var sign = endpoint.required ? "&#x274C" : "&#x270B"
                    cell!.innerHTML = sign + " " + reason;
                })
        })
    })
    .catch(reason => console.log(reason));