async function getIds(body, path) {
    var myInit = {
        method: "POST",
        headers: new Headers(),
        mode: "cors",
        cache: "default",
        body: body,
    };
    const response = await fetch(
        `${window.location.protocol}//${window.location.host}/${path}`,
        myInit
    );
    const blob = await response.blob();
    const text = await blob.text();
    const ids = JSON.parse(text);
    if (response.status != 200) {
        var load = document.getElementById("load");
        var btnenviar = document.getElementById("btnenviar");
        btnenviar.setAttribute(
            "class",
            "row justify-content-center align-items-center"
        );
        load.setAttribute(
            "class",
            "row justify-content-center align-items-center d-none"
        );
        alert("Falha no Download");

        return;
    }
    for (const i in ids) {
        await downloadFile(ids[i]);
    }
}

async function downloadFile(id) {
    var myInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default",
    };
    var response = await fetch(
        `${window.location.protocol}//${window.location.host}/id/${id}`,
        myInit
    );
    var myBlob = await response.blob();
    var a = document.createElement("a");
    var url = window.URL.createObjectURL(myBlob);
    a.href = url;
    var filename = response.headers.get("File-Name");
    a.download = filename || "data.xlsx";
    this.console.log(filename);
    a.click();
    a.remove();
    var load = document.getElementById("load");
    var btnenviar = document.getElementById("btnenviar");
    btnenviar.setAttribute(
        "class",
        "row justify-content-center align-items-center"
    );
    load.setAttribute(
        "class",
        "row justify-content-center align-items-center d-none"
    );
    alert("Download Concluído");
    window.URL.revokeObjectURL(url);
}

function enviarExcel() {
    var input = document.getElementById("file");
    if (input.files.length > 0) {
        let formData = new FormData();
        formData.append("file", input.files[0], input.files[0].name);
        var load = document.getElementById("load");
        var btnenviar = document.getElementById("btnenviar");
        btnenviar.setAttribute(
            "class",
            "row justify-content-center align-items-center d-none"
        );
        load.setAttribute("class", "row justify-content-center align-items-center");

        getIds(formData, "xml");
    }
}