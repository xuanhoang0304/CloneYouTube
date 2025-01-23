"use client";

import { useRouter } from "next/navigation";

import useClickOutside from "@/hooks/useClickOutSide";
import { useYouTubeStore } from "@/store/store";

const CtaLogin = () => {
    const { moveLogin, setMoveLogin } = useYouTubeStore();
    const router = useRouter();
    const handleClose = () => {
        setMoveLogin(false);
    };
    const ref = useClickOutside<HTMLDivElement>(handleClose);
    if (!moveLogin) return null;
    if (moveLogin) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div
                    ref={ref}
                    className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative"
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Bạn có muốn đăng nhập ?
                    </h2>

                    <p className="text-sm text-gray-500 mb-6">
                        Vui lòng đăng nhập tài khoản google để tiếp tục.
                    </p>

                    <div className="flex space-x-4">
                        <button
                            onClick={handleClose}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={() => {
                                router.push("/login");
                                setMoveLogin(false);
                            }}
                            className="flex-1 bg-blue-600  text-white  py-2 px-4 rounded-lg font-medium hover:bg-blue-700"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default CtaLogin;
