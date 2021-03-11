const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/core")

async function main() {
	try {
		// `who-to-greet` input defined in action metadata file
		const repo = core.getInput('repository');
		const prNum = core.getInput('pr-number');
		const octokit = new Octokit({ auth: `personal-access-token123` });

		const response = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
			owner: 'octocat',
			repo: 'hello-world',
			pull_number: 42
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