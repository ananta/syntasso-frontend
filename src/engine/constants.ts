export interface ILanguage {
  js: string;
  c: string;
  cpp: string;
}

export const codeStub: ILanguage = {
  js: `
  "use strict";
  let rawSampleInput,
	  parsedInput = [],
	  currentLine = 0;
  // TODO:
  // write your function here:
  // example:
  function calcArea(length, breadth) {
  	return length * breadth;
  }
  // use this function to read individual lines of the sample input, ...
  // ... incrementing the line-pointer on each read
  const readLine = () => parsedInput[currentLine++];
  const main = () => {
	  if (process.argv.length == 3) {
		  rawSampleInput = process.argv[2];
		  parsedInput = rawSampleInput.split("\\n");
		  // TODO:
		  // invoke your function here:
		  // example:
		  try {
			  let length = parseInt(readLine());
			  let breadth = parseInt(readLine());
			  let output = calcArea(length, breadth);
			  process.stdout.write(output.toString());
		  } catch (error) {
			  process.stderr.write(error);
		  }
	  } else if (process.argv.length > 3) {
		  throw new Error("Too many inputs provided");
	  } else {
		  throw new Error("No input provided");
	  }
  };
  main();
  `,
  c: `

  #include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TRUE 1
#define FALSE 0

#define SAMPLE_INPUT_MAX_LINES 500

int parseRawSampleInput();
char *readLine();

// to store the raw sample input file's contents, e.g., "1\n2 3 4 5"
char *rawSampleInput;
// to store the parsed sample input, separated by linebreak, e.g, ["1", "2 3 4 5"] ...
// ...; an array of strings
char *sampleInput[SAMPLE_INPUT_MAX_LINES];
// to indicate the length of sampleInput array
int len_sampleInput = 0;
// current index of sampleInput
int currentLine = 0;

// TODO:
// write your function here:
// example:
// int calcArea(int length, int breadth) {
//		return length * breadth;
// }

int main(int argc, char *argv[]) {
	if (argc == 2) {
		// get raw sample inputs from command-line arguments
		rawSampleInput = argv[1];
		// parse rawSampleInput into linebreak-separated input(s)
		int isParsed = parseRawSampleInput(rawSampleInput);
		if (isParsed == FALSE) {
			// write to stderr
			fprintf(stderr, "Length of sample input lines exceeded 500");
			return -1;
		}
		// TODO:
		// read individual lines from parsed sample inputs like following
		// char *line = readLine();
		// while (line != NULL) {
		// 	line = readLine();
		// }
		// TODO:
		// invoke your function here:
		// example:
		// int length = atoi(readLine());
		// int breadth = atoi(readLine());
		// int output = calcArea(length, breadth);
		// printf("%d", output);
	} else if (argc > 2) {
		// write to stderr
		fprintf(stderr, "Too Many Inputs Provided");
		return -1;
	} else {
		// write to stderr
		fprintf(stderr, "No Input Provided");
		return -1;
	}
}

int parseRawSampleInput(char *rawSampleInput) {
	/*
	* Parse raw sample input, e.g., "1\n2 3 4 5 6" into line-separated strings ,...
	* ... e.g., ["1", "2 3 4 5 6"]
	* Returned values:
	* TRUE /Integer Equivalent 1/ if OK
	* FALSE /Integer Equivalent 0/ if length of sampleInputs is greater than ...
	* ... SAMPLE_INPUT_MAX_LINES
	*/
	// search for "\n" (linebreak) in the raw sample input string
	char *token = strtok(rawSampleInput, "\n");
	int counter = 0;
	while (token != NULL && len_sampleInput <= SAMPLE_INPUT_MAX_LINES) {
		// push the token, say "1" or "2 3 4 5 6" into the array of strings- sampleInput
		sampleInput[counter++] = token;
		// increment variable to indicate length of sampleInput array
		len_sampleInput++;
		token = strtok(NULL, "\n");
	}
	if (len_sampleInput > SAMPLE_INPUT_MAX_LINES)
		return FALSE;
	return TRUE;
}

char *readLine() { return sampleInput[currentLine++]; }
  `,
  cpp: `
  #include<iostream>
#include<string>
#include<vector>
using namespace std;

const int SAMPLE_INPUT_MAX_LINES = 500;

vector<string> sampleInput;
size_t currentLine = 0;

bool parse_raw_sample_input(string rawSampleInput);
vector<string> split(string str, string delimiter);
string read_line();

// TODO:
// write your function here:
// example:
// int calc_area(int length, int breadth) {
// 		return length * breadth;
// }

int main(int argc, char *argv[]) {
	if (argc == 2) {
		// get raw sample inputs from command-line arguments
		string rawSampleInput = argv[1];
		// parse the raw input into line-break separated input(s)
		bool isParsed = parse_raw_sample_input(rawSampleInput);
		if (!isParsed) {
			// write to stderr
			cerr << "Length of sample input lines exceeded 500";
			return -1;
		}

		// TODO:
		// read individual lines from parsed sample inputs like following:
		// string line;
		// string line = read_line();
		// while (line != "") {
		// 	cout << "During readLine: " << line << endl;
		// 	line = read_line();
		// }

		// TODO:
		// invoke your function here:
		// example:
		// int length = stoi(read_line());
		// int breadth = stoi(read_line());
		// int output = calc_area(length, breadth);
		// cout << output;

	} else if (argc > 2) {
		cerr << "Too many inputs provided";
	} else {
		cerr << "No input provided";
	}
}

/*
* parse the raw input string into a vector of ...
* ... linebreak-separated string(s)
* e.g., "1\n2 3 4 5" into ["1", "2 3 4 5"]
*/
bool parse_raw_sample_input(string rawInput) {
	sampleInput = split(rawInput, "\n");
	if (sampleInput.size() > SAMPLE_INPUT_MAX_LINES)
		return false;
	return true;
}

/*
* read individual lines from the sample input; incrementing the currentLine ...
* ... value each time it's called
*/
string read_line() {
	if (currentLine == sampleInput.size()) return "";
	return sampleInput.at(currentLine++);
}

/*
* split a string into a vector of substrings, each substring ...
* ... separated by a delimiter
*/
vector<string> split(string str, string delimiter) {
	// find the first occurrence of delimiter in string
	size_t position = str.find(delimiter);
	// return a vector of tokens, each separated by the delimiter
	vector<string> tokens;
	string token;
	// remainingString stores a substring from the original string
	string remainingString = str;
	while (position != string::npos) {
		token = remainingString.substr(0, position);
		remainingString = remainingString.substr(position + 1);
		tokens.push_back(token);
		position = remainingString.find(delimiter);
	}
	if (position == string::npos)
		tokens.push_back(remainingString);
	return tokens;
}
  `,
};

export const engineURL: ILanguage = {
  js: 'http://localhost:8080',
  c: 'http://localhost:8081',
  cpp: 'http://localhost:8082',
};
