const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
	console.log("Start action")
	try {
		const repo = core.getInput('repository');
		const prNum = core.getInput('pr-number');
		const myToken = core.getInput('myToken');
		const octokit = github.getOctokit(myToken);
		console.log(`data ${repo}, ${prNum}`);
		// const octokit = new Octokit({baseUrl: "https://api.github.com/"});

		const response = await octokit.request('GET https://api.github.com/repos/{owner}/{repo}/pulls/{pull_number}/files', {
			owner: "prezi",
			repo: "test-github-actions",
			pull_number: prNum
		})


		for (const r of response) {
			console.log("-")
		}

	} catch (error) {
		core.setFailed(error.message);
	}
}

main();