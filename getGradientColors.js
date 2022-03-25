// 将#hex 16进制色值转换成rgb 数组
const parseColor = (hexStr) => {
	return hexStr.length === 4
		? hexStr
				.substr(1)
				.split("")
				.map(function (s) {
					return 0x11 * parseInt(s, 16);
				})
		: [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(
				function (s) {
					return parseInt(s, 16);
				}
		  );
};

// 将不足两位的用0补齐
const pad = (s) => {
	return s.length === 1 ? "0" + s : s;
};
/*
    @获取渐变色值数组
    @start:起始色值 #hex
    @end:结束色值 #hex
    @steps:步进 分割为多少个
    @gamma:gamma值  递进 2.2较为合适
*/
const getGradientColors = (start, end, steps, gamma) => {
	var i,
		j,
		ms,
		me,
		output = [],
		so = [];
	gamma = gamma || 1;
	var normalize = (channel) => Math.pow(channel / 255, gamma);
	start = parseColor(start).map(normalize);
	end = parseColor(end).map(normalize);
	for (i = 0; i < steps; i++) {
		ms = i / (steps - 1);
		me = 1 - ms;
		for (j = 0; j < 3; j++) {
			so[j] = pad(
				Math.round(
					Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255
				).toString(16)
			);
		}
		output.push("#" + so.join(""));
	}
	return output;
};
export default getGradientColors;
