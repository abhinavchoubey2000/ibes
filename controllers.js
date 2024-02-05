let nodemailer = require("nodemailer");

exports.sendUserQuery = async (req, res) => {
	try {
		const { name, email, message } = req.body;
		const user = { name, email, message };
		const mailTransport = await nodemailer.createTransport({
			host: "smtp.gmail.com",
			secure: false,
			port: 587,
			auth: {
				user: process.env.AUTH_ID,
				pass: process.env.AUTH_PASSWORD,
			},
		});

		await mailTransport.sendMail({
			to: process.env.AUTH_ID,
			from: user.email,
			subject: `Query - ${user.name}`,
			html: `<p>Client's Name - <b>${user.name}</b></p>
			<p>Client's Email - <b>${user.email}</b></p>
			<p>Client's Query - <b>${user.message}</b></p>`,
		});

		await mailTransport.sendMail({
			to: user.email,
			from: process.env.AUTH_ID,
			subject: `International Business Expert Solutions`,
			html: `<p>Greetings from IBES!,</p>
			<p>I hope you are doing well.</p> <p>Thanks for showing your interest to us.</p>
			<p>We will reach you as soon as possible.</p>
			<p>Thanks and Regards</p>
			<p><b>Team IBES</b></p>`,
		});

		return res
			.status(200)
			.cookie("name", user.name, {
				expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			})
			.json({
				success: true,
				message:
					"Your query have been recorded. We will reach you as soon as possible",
			});
	} catch (error) {
		res.status(200).json({ success: false, message: error.message });
	}
};
