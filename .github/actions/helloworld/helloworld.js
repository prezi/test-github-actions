const core = require('@actions/core');
const github = require('@actions/github');

function main() {
	try {
		// `who-to-greet` input defined in action metadata file
		const repo = core.getInput('repository');
		const prNum = core.getInput('pr-number');

		console.log(`data ${repo}, ${prNum}`);
	  } catch (error) {
		core.setFailed(error.message);
	  }
}

main();