const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
	try {
		const repo = core.getInput('repository');
		const prNum = core.getInput('pr-number');
		const octokit = github.getOctokit("https://github.com/prezi/test-github-actions/")
		// const octokit = new Octokit({baseUrl: "https://api.github.com/"});

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