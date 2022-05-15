import TTV from "models/TTV";
import "models/dbConnect";

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const ttvs = await TTV.find({}).sort({
                    createdAt: "desc",
                });

                return res.status(200).json({
                    success: true,
                    data: ttvs,
                });
            } catch (error) {
                return res.status(400).json({
                    success: false,
                });
            }
        case "POST":
            try {
                const ttvs = await TTV.create(req.body);
                return res.status(201).json({
                    success: true,
                    data: ttvs,
                });
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    error: error
                });
            }
        default:
            res.setHeaders("Allow", ["GET", "POST"]);
            return res
                .status(405)
                .json({ success: false })
                .end(`Method ${method} Not Allowed`);
    }
};