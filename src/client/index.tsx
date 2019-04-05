console.clear();

import * as  React from "react";
import * as  ReactDOM from "react-dom";

import App from "@components/App/App";
import * as DnD from "dnd5e-client";

DnD.ClientEndpoints.races().then(console.log);

const target = document.createElement("div");
document.body.appendChild(target);

ReactDOM.render(
	<App />,
	target
);

