export default async function handler(req, res) {
  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress;

  try {
    // Fetch IP details from ip-api
    const response = await fetch(`http://ip-api.com/json/${clientIp}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching IP data:", error);
    res.status(500).json({ error: "Failed to fetch IP data" });
  }
}
