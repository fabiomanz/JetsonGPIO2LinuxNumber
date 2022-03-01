// Run this with node locally 
// node convertGPIO2LinuxNumber.js GPIO...

if (process.argv.length != 3) {
	console.log("Usage: node convertGPIO2LinuxNumber.js GPIO...    (e.g. GPIO06, or SDMMC_DAT2)>");
	process.exit(1);
}

signalName = process.argv[2];

console.log("Converting " + signalName + " ...");

const pinTable = {
	"GPIO09": "GPIO3_PS.04",
	"I2S1_SCLK": "GPIO3_PT.01",
	"I2S1_DOUT": "GPIO3_PT.02",
	"I2S1_DIN": "GPIO3_PT.03",
	"I2S1_FS": "GPIO3_PT.04",
	"I2S0_SCLK": "GPIO3_PT.05",
	"I2S0_DOUT": "GPIO3_PT.06",
	"I2S0_DIN": "GPIO3_PT.07",
	"I2S0_FS": "GPIO3_PU.00",
	"SDMMC_CLK": "GPIO3_PO.00",
	"SDMMC_CMD": "GPIO3_PO.01",
	"SDMMC_DAT0": "GPIO3_PO.02",
	"SDMMC_DAT1": "GPIO3_PO.03",
	"SDMMC_DAT2": "GPIO3_PO.04",
	"SDMMC_DAT3": "GPIO3_PO.05",
	"FORCE_RECOVERY*": "GPIO3_PG.00",
	"GPIO14": "GPIO3_PH.01",
	"I2C2_SCL": "GPIO3_PI.03",
	"I2C2_SDA": "GPIO3_PI.04",
	"UART0_TXD": "GPIO3_PX.04",
	"UART0_RXD": "GPIO3_PX.05",
	"UART0_RTS*": "GPIO3_PX.06",
	"UART0_CTS*": "GPIO3_PX.07",
	"SPI1_SCK": "GPIO3_PY.00",
	"SPI1_MISO": "GPIO3_PY.01",
	"SPI1_MOSI": "GPIO3_PY.02",
	"SPI1_CS0*": "GPIO3_PY.03",
	"SPI1_CS1*": "GPIO3_PY.04",
	"GPIO00": "GPIO3_PZ.01",
	"SPI0_SCK": "GPIO3_PZ.03",
	"SPI0_MISO": "GPIO3_PZ.04",
	"SPI0_MOSI": "GPIO3_PZ.05",
	"SPI0_CS0*": "GPIO3_PZ.06",
	"SPI0_CS1*": "GPIO3_PZ.07",
	"SYS_RESET*": "SFIO",
	"MOD_SLEEP*": "SFIO",
	"SLEEP/WAKE*": "GPIO3_PEE.04",
	"CAN_TX": "GPIO3_PAA.02",
	"CAN_RX": "GPIO3_PAA.03",
	"GPIO03": "GPIO3_PCC.00",
	"GPIO04": "GPIO3_PCC.01",
	"GPIO05": "GPIO3_PCC.02",
	"GPIO06": "GPIO3_PCC.03",
	"GPIO12": "GPIO3_PCC.04",
	"UART2_TXD": "GPIO3_PCC.05",
	"UART2_RXD": "GPIO3_PCC.06",
	"I2C0_SCL": "GPIO3_PCC.07",
	"I2C0_SDA": "GPIO3_PDD.00",
	"CAM0_MCLK": "GPIO3_PP.00",
	"CAM1_MCLK": "GPIO3_PP.01",
	"CAM_I2C_SCL": "GPIO3_PP.02",
	"CAM_I2C_SDA": "GPIO3_PP.03",
	"CAM0_PWDN": "GPIO3_PP.04",
	"CAM1_PWDN": "GPIO3_PP.05",
	"GPIO10": "GPIO3_PQ.01",
	"GPIO08": "GPIO3_PQ.02",
	"GPIO02": "GPIO3_PQ.03",
	"GPIO01": "GPIO3_PQ.05",
	"GPIO11": "GPIO3_PQ.06",
	"GPIO07": "GPIO3_PR.00",
	"UART1_TXD": "GPIO3_PR.02",
	"UART1_RXD": "GPIO3_PR.03",
	"UART1_RTS*": "GPIO3_PR.04",
	"UART1_CTS*": "GPIO3_PR.05",
	"PCIE1_CLKREQ_N": "GPIO3_PL.00",
	"PCIE1_RST_N": "GPIO3_PL.01",
	"PCIE_WAKE*": "GPIO3_PL.02",
	"PCIE0_CLKREQ*": "SFIO",
	"PCIE0_RST*": "SFIO",
	"PCIE1_CLK_P": "SFIO",
	"PCIE1_CLK_N": "SFIO",
	"PCIE0_CLK_P": "SFIO",
	"PCIE0_CLK_N": "SFIO",
	"DP0_AUX_P": "SFIO",
	"DP0_AUX_N": "SFIO",
	"DP0_HPD": "GPIO3_PM.00",
	"DP1_AUX_P": "SFIO",
	"DP1_AUX_N": "SFIO",
	"DP1_HPD": "GPIO3_PM.01",
	"I2C1_SCL": "SFIO",
	"I2C1_SDA": "SFIO",
	"HDMI_CEC": "GPIO3_PM.04",
	"GPIO13": "GPIO3_PN.01",
	"CSI0_CLK_N": "SFIO",
	"CSI0_CLK_P": "SFIO",
	"CSI0_D0_N": "SFIO",
	"CSI0_D0_P": "SFIO",
	"CSI0_D1_N": "SFIO",
	"CSI0_D1_P": "SFIO",
	"CSI1_CLK_N": "SFIO",
	"CSI1_CLK_P": "SFIO",
	"CSI1_D0_N": "SFIO",
	"CSI1_D0_P": "SFIO",
	"CSI1_D1_N": "SFIO",
	"CSI1_D1_P": "SFIO",
	"CSI2_CLK_N": "SFIO",
	"CSI2_CLK_P": "SFIO",
	"CSI2_D0_N": "SFIO",
	"CSI2_D0_P": "SFIO",
	"CSI2_D1_N": "SFIO",
	"CSI2_D1_P": "SFIO",
	"CSI3_CLK_N": "SFIO",
	"CSI3_CLK_P": "SFIO",
	"CSI3_D0_N": "SFIO",
	"CSI3_D0_P": "SFIO",
	"CSI3_D1_N": "SFIO",
	"CSI3_D1_P": "SFIO",
	"CSI4_CLK_N": "SFIO",
	"CSI4_CLK_P": "SFIO",
	"CSI4_D0_N": "SFIO",
	"CSI4_D0_P": "SFIO",
	"CSI4_D1_N": "SFIO",
	"CSI4_D1_P": "SFIO",
	"CSI4_D2_N": "SFIO",
	"CSI4_D2_P": "SFIO",
	"CSI4_D3_N": "SFIO",
	"CSI4_D3_P": "SFIO",
	"DSI_CLK_N": "SFIO",
	"DSI_CLK_P": "SFIO",
	"DSI_D0_N": "SFIO",
	"DSI_D0_P": "SFIO",
	"DSI_D1_N": "SFIO",
	"DSI_D1_P": "SFIO",
	"DP0_TXD0_P": "SFIO",
	"DP0_TXD0_N": "SFIO",
	"DP0_TXD1_P": "SFIO",
	"DP0_TXD1_N": "SFIO",
	"DP0_TXD2_P": "SFIO",
	"DP0_TXD2_N": "SFIO",
	"DP0_TXD3_P": "SFIO",
	"DP0_TXD3_N": "SFIO",
	"DP1_TXD0_P": "SFIO",
	"DP1_TXD0_N": "SFIO",
	"DP1_TXD1_P": "SFIO",
	"DP1_TXD1_N": "SFIO",
	"DP1_TXD2_P": "SFIO",
	"DP1_TXD2_N": "SFIO",
	"DP1_TXD3_P": "SFIO",
	"DP1_TXD3_N": "SFIO",
	"USB0_D_N": "SFIO",
	"USB0_D_P": "SFIO",
	"USB1_D_N": "SFIO",
	"USB1_D_P": "SFIO",
	"USB2_D_N": "SFIO",
	"USB2_D_P": "SFIO",
	"USBSS_RX_P": "SFIO",
	"USBSS_RX_N": "SFIO",
	"USBSS_TX_P": "SFIO",
	"USBSS_TX_N": "SFIO",
	"PCIE1_RX0_P": "SFIO",
	"PCIE1_RX0_N": "SFIO",
	"PCIE1_TX0_P": "SFIO",
	"PCIE1_TX0_N": "SFIO",
	"PCIE0_RX0_P": "SFIO",
	"PCIE0_RX0_N": "SFIO",
	"PCIE0_TX0_P": "SFIO",
	"PCIE0_TX0_N": "SFIO",
	"PCIE0_RX1_P": "SFIO",
	"PCIE0_RX1_N": "SFIO",
	"PCIE0_TX1_P": "SFIO",
	"PCIE0_TX1_N": "SFIO",
	"PCIE0_RX2_P": "SFIO",
	"PCIE0_RX2_N": "SFIO",
	"PCIE0_TX2_P": "SFIO",
	"PCIE0_TX2_N": "SFIO",
	"PCIE0_RX3_P": "SFIO",
	"PCIE0_RX3_N": "SFIO",
	"PCIE0_TX3_P": "SFIO",
	"PCIE0_TX3_N": "SFIO"
}

const portToNumMain = {
	A: 0,
	B: 1,
	C: 2,
	D: 3,
	E: 4,
	F: 5,
	G: 6,
	H: 7,
	I: 8,
	J: 9,
	K: 10,
	L: 11,
	M: 12,
	N: 13,
	O: 14,
	P: 15,
	Q: 16,
	R: 17,
	S: 18,
	T: 19,
	U: 20,
	V: 21,
	W: 22,
	X: 23,
	Y: 24,
	Z: 25,
	FF: 26,
	GG: 27
}
const portToNumAon = {
	AA: 0,
	BB: 1,
	CC: 2,
	DD: 3,
	EE: 4
}

function editDistance(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	var costs = new Array();
	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;
		for (var j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
					var newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue),
							costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
	return costs[s2.length];
}

function similarity(s1, s2) {
	var longer = s1;
	var shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	var longerLength = longer.length;
	if (longerLength == 0) {
		return 1.0;
	}
	return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function printSimilarPins(gpio) {
	const closest = [];
	let closestDist = 0;
	for (var key in pinTable) {
		const dist = similarity(key, gpio);
		if (dist > 0.7) {
			closest.push(key);
			closestDist = dist;
		}
	}

	closest.sort((a, b) => {
		return similarity(b, gpio) - similarity(a, gpio);
	})

	console.log(`\nClosest matches for ${gpio}:\n`);
	for (var i = 0; i < closest.length; i++) {
		console.log(`${closest[i]} (${Math.round(similarity(closest[i], gpio) * 100)}%)`);
	}
}

if (!(signalName in pinTable)) {
	console.log("ERROR: Signal " + signalName + " does not exist!");

	printSimilarPins(signalName);

	process.exit(1);
}

const gpioName = pinTable[signalName];

if (gpioName === "SFIO") {
	console.log("ERROR: Signal " + signalName + " is not a GPIO, but has a special function (SFIO)!");
	process.exit(1);
}

function getLinuxGPIO_Num(gpio) {
	const temp = gpio.replaceAll("GPIO3_P", "");

	const parts = temp.split(".")
	const gpioPort = parts[0];

	if (!((gpioPort in portToNumMain) || (gpioPort in portToNumAon))) {
		console.log("ERROR: GPIO port " + gpioPort + " does not exist!");
	}

	const gpioPin = parseInt(parts[1]);

	if (gpioPort in portToNumMain) {
		const gpioPortNum = portToNumMain[gpioPort];
		return (gpioPortNum * 8) + gpioPin + 288;
	} else if (gpioPort in portToNumAon) {
		const gpioPortNum = portToNumAon[gpioPort];
		return (gpioPortNum * 8) + gpioPin + 248;
	}
}

const linuxNum = getLinuxGPIO_Num(gpioName);

console.log(gpioName + " has the Linux GPIO Number:  gpio" + linuxNum + "");
