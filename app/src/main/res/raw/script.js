let dia = ("0" + (new Date().getDate())).slice(-2);
let mes = ("0" + (new Date().getMonth() + 1)).slice(-2);
let ano = new Date().getFullYear();
let hoje = dia + "/" + mes + "/" + ano;


if(localStorage.getItem("hoje") != hoje) {
	localStorage.setItem("hoje", hoje);
	localStorage.setItem("sono", "false");
	localStorage.setItem("comida", "false");
	localStorage.setItem("futuro", "false");
}

if(localStorage.getItem("sono") == "true") {
	document.getElementById("sono1").checked = true;
}
if(localStorage.getItem("comida") == "true") {
	document.getElementById("comida1").checked = true;
}
if(localStorage.getItem("futuro") == "true") {
	document.getElementById("futuro1").checked = true;
}

let historico = localStorage.getItem("historico") ? localStorage.getItem("historico") : hoje + ",0-";

function mostra() {
	let htm = "";
	let valor = 0;

	if(document.form.sono.value == 1) {
		valor++;
		localStorage.setItem("sono", "true");
	}
	else localStorage.setItem("sono", "false");

	if(document.form.comida.value == 1) {
		valor++;
		localStorage.setItem("comida", "true");
	}
	else localStorage.setItem("comida", "false");

	if(document.form.futuro.value == 1) {
		valor++;
		localStorage.setItem("futuro", "true");
	}
	else localStorage.setItem("futuro", "false");


	deleta(hoje);
	historico += hoje + "," + valor + "-";

	let registros = historico.split("-");
	for(let r = registros.length - 2; r >= 0; r--) {
		let dados = registros[r].split(",");
		let dia = dados[0];
		let valor = dados[1];

		let htmlink = "<a oncontextmenu=\"confirma('" + dia + "');\">" + dia + "</a>";
		htm += "<br>" + htmlink + " &nbsp; &nbsp; ";

		for(let v = 0; v < 3; v++) {
			htm += "<input type=radio" + (v >= valor ? "" : " checked") + " onclick=\"mostra();\">";
		}
	}

	localStorage.setItem("historico", historico);

	document.getElementById("relatorio").innerHTML = htm;
}

function deleta(d) {
	let draft = "";
	
	let registros = historico.split("-");
	for(let r = 0; r < registros.length - 1; r++) {
		let dados = registros[r].split(",");
		let dia = dados[0];
		let valor = dados[1];

		if(dia != d){
			draft += dia + "," + valor + "-";
		}
	}

	historico = draft;
}

function confirma(d) {
	if(d != hoje) {
		let buttondel = "<button onclick=\"deleta('" + d + "'); mostra();\">excluir " + d + "</button>";
		let buttonback = "<button onclick=\"mostra();\">voltar</button>";
		document.getElementById("relatorio").innerHTML = "<br>" + buttondel + "<br><br>" + buttonback;
	}
	return false;
}

mostra();
