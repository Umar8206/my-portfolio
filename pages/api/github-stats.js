export default async function handler(req, res) {
  try {
    const username = "Umar8206";

    const query = `
      query($login: String!) {
        user(login: $login) {
          repositories(privacy: PUBLIC, first: 1) {
            totalCount
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            totalPullRequestReviewContributions
          }
        }
      }
    `;

    const r = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });

    const json = await r.json();

    if (!r.ok || json.errors) {
      return res.status(500).json({ message: "GitHub GraphQL error", errors: json.errors });
    }

    const u = json.data.user;

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

    return res.status(200).json({
      repoCount: u.repositories.totalCount,
      totalContributions: u.contributionsCollection.contributionCalendar.totalContributions,
      commits: u.contributionsCollection.totalCommitContributions,
      prs: u.contributionsCollection.totalPullRequestContributions,
      issues: u.contributionsCollection.totalIssueContributions,
      reviews: u.contributionsCollection.totalPullRequestReviewContributions,
    });
  } catch (e) {
    return res.status(500).json({ message: "Failed to load GitHub stats" });
  }
}
