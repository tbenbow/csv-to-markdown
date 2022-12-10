"use strict";
exports.__esModule = true;

const fs = require('fs');

/**
 * Converts CSV to Markdown Files
 *
 * @param {string} csvContent - The string content of the CSV
 * @param {string} delimiter - The character(s) to use as the CSV column delimiter
 * @param {boolean} hasHeader - Whether to use the first row of Data as headers
 * @returns {string}
 */
function csvToMarkdown(csvContent, delimiter=",", hasHeader=true) {
    

    if (delimiter === void 0) { delimiter = "\t"; }
    if (hasHeader === void 0) { hasHeader = false; }
    if (delimiter != "\t") {
        csvContent = csvContent.replace(/\t/g, "    ");
    }

    var columns = csvContent.split(/\r?\n/);
    var tabularData = [];
    var maxRowLen = [];

    columns.forEach((e, i) => {
        fs.writeFile(`newfile_${i}.txt`, 'Learn Node FS module', function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          });
        if (typeof tabularData[i] == "undefined") {
            tabularData[i] = [];
        }
        var regex = new RegExp("".concat(",", "(?![^\"]*\"(?:$|").concat(",", "))"));
        var row = e.split(regex);
        row.forEach(function (ee, ii) {
            if (typeof maxRowLen[ii] == "undefined") {
                maxRowLen[ii] = 0;
            }
            // escape pipes and backslashes
            ee = ee.replace(/(\||\\)/g, "\\$1");
            maxRowLen[ii] = Math.max(maxRowLen[ii], ee.length);
            tabularData[i][ii] = ee;
        });
    });

    var headerOutput = "";
    var seperatorOutput = "";

    maxRowLen.forEach(function (len) {
        var sizer = Array(len + 1 + 2);
        seperatorOutput += "|" + sizer.join("-");
        headerOutput += "|" + sizer.join(" ");
    });
    
    headerOutput += "| \n";
    seperatorOutput += "| \n";
    
    if (hasHeader) {
        headerOutput = "";
    }
    var rowOutput = "";

    tabularData.forEach(function (col, i) {
        maxRowLen.forEach(function (len, y) {
            var row = typeof col[y] == "undefined" ? "" : col[y];
            var spacing = Array((len - row.length) + 1).join(" ");
            var out = "| ".concat(row).concat(spacing, " ");
            if (hasHeader && i === 0) {
                headerOutput += out;
            }
            else {
                rowOutput += out;
            }
        });
        if (hasHeader && i === 0) {
            headerOutput += "| \n";
        }
        else {
            rowOutput += "| \n";
        }
    });
    return "".concat(headerOutput).concat(seperatorOutput).concat(rowOutput);
}
exports["default"] = csvToMarkdown;
if (typeof module != "undefined") {
    module.exports = csvToMarkdown;
}

const output = csvToMarkdown(
    (`one,two,three
    four,five,six
    `))
console.log(output)