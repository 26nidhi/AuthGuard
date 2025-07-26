import { User } from "../models/user.models";

export const getUserData = async () => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "User not found" })  
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isaccountVerified
            }
        })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}