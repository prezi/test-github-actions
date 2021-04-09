const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
	console.log("Start action")
	try {
		const [owner, repo] = core.getInput('repository').split("/");
		const myToken = core.getInput('myToken');
		const octokit = github.getOctokit(myToken);
		const headCommitSha = github.context.payload.comment != null ?
			github.context.payload.comment.body : null;
		console.log("xxx: owner, repo, commit: ", owner, repo, headCommitSha)

		console.log("xxx context: ", github.context)
		await octokit.request("POST /repos/{owner}/{repo}/statuses/{sha}", {
			owner: owner,
			repo: repo,
			sha: headCommitSha,
			state: "failure",
		});

	} catch (error) {
		core.setFailed(error.message);
	}
}

main();