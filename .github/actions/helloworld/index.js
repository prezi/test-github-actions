const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/core")

async function main() {
	try {
		// `who-to-greet` input defined in action metadata file
		const repo = core.getInput('repository');
		const prNum = core.getInput('pr-number');
		const octokit = new Octokit();

		const response = await octokit.request('GET /repos/{repo}/pulls/{pull_number}/files', {
			repo: repo,
			pull_number: prNum
		})

		console.log(`data ${repo}, ${prNum}`);
		for (const r of response) {
			console.log("")
		}

	} catch (error) {
		core.setFailed(error.message);
	}
}

main();