import ButtonComponent from "./utils/ButtonComponent";

export default function Offers() {
    return (
        <div className="rounded-3xl w-full bg-gradient-to-br from-purple-300 to-purple-100 px-6 py-8 shadow-md">
            <div className="flex flex-col justify-between items-center gap-6">
                <div className="flex-1 mr-auto">
                    <h1 className="font-extrabold text-purple-900 text-4xl mb-3">
                        REFER & EARN
                    </h1>
                    <p className="text-purple-800 text-base leading-relaxed">
                        Love what we do? Share it with your friends! <br />
                        Refer a friend and get{" "}
                        <span className="font-semibold text-purple-900">
                            ₹250/month
                        </span>{" "}
                        for every successful referral.
                    </p>
                </div>

                <div className="mt-auto mr-auto">
                    <ButtonComponent text="Refer Now" />
                </div>
            </div>
        </div>
    );
}
