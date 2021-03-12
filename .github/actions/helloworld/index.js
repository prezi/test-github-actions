const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
	console.log("Start action")
	try {
		const [owner, repo] = core.getInput('repository').split("/");
		const prNum = core.getInput('pr-number');
		const myToken = core.getInput('myToken');
		const octokit = github.getOctokit(myToken);
		console.log(`data ${repo}, ${prNum}`);
		// const octokit = new Octokit({baseUrl: "https://api.github.com/"});

		const response = await octokit.request('GET https://api.github.com/repos/{owner}/{repo}/pulls/{pull_number}/files', {
			owner: owner,
			repo: repo,
			pull_number: prNum
		})

		for (const r of response.data) {
			console.log("-", r.filename);
		}

	} catch (error) {
		core.setFailed(error.message);
	}
}

main();