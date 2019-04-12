import { Endpoints, FetchLike } from "dnd5e-server";
import path from "path";
import fs from "fs";

interface BasicResource {
	index: number;
	url: string;
	name: string;
}

const mockFetch: FetchLike = (url: string) => new Promise(res => res({
	json: () => {
		const parts = url
			.replace(/^\//, "")
			.replace(/\/$/, "")
			.split("/");

		if (!parts.length) return Promise.reject();

		const propName = parts[0]
			.replace(/(?:^|-)\w/g, sub => sub.toUpperCase());

		const fileName = `5e-SRD-${propName}.json`;
		const filePath = path.resolve(__dirname, "../../../5e-database", fileName);

		return new Promise(res => {
			fs.readFile(filePath, "utf8", (err, data) => {
				const json: BasicResource[] = JSON.parse(data);

				if (parts.length === 1) {
					if (propName === "Classes") {
						res({
							count: json.length,
							results: json.map(item => ({
								class: item.name,
								url: item.url,
							}))
						});
					} else {
						res({
							count: json.length,
							results: json.map(item => ({
								name: item.name,
								url: item.url,
							}))
						});
					}
				} else {
					const index = parseInt(parts[1]) - 1;
					res(json[index]);
				}
			});
		});
	},
}));

const MockEndpoints = new Endpoints(mockFetch, "");

export default MockEndpoints;
