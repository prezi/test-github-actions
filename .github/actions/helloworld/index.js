const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
	console.log("Start action")
	try {
		const [owner, repo] = core.getInput('repository').split("/");
		const myToken = core.getInput('myToken');
		const octokit = github.getOctokit(myToken);
		const headCommitSha =
		github.context.payload.pull_request != null ? github.context.payload.pull_request.head.sha : null;
		await octokit.request("POST /repos/{owner}/{repo}/statuses/{sha}", {
			owner: owner,
			repo: repo,
			sha: headCommitSha,
			state: "success",
		});

	} catch (error) {
		core.setFailed(error.message);
	}
}

main();