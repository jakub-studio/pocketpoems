const { spawn } = require("child_process");
const { resolve, join } = require("path");

const oldFileName = `${process.argv[2]}.jpg`;
const newFileName = `o-${process.argv[2]}.jpg`;
const imgBasePath = resolve("./img/");
const pwaResImgPath = resolve ("./repo/pwa-res/img");

spawn(
	join(imgBasePath, "guetzli.exe"),
	[
		join(imgBasePath, oldFileName),
		join(pwaResImgPath, newFileName)
	]
);