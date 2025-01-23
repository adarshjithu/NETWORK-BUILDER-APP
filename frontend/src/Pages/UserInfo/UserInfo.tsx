import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { deleteProfile, getProfile, updateProfile } from "../../api/userServices";
import Loading from "../../Components/Loading/Loading";
import { userSchema } from "../../Utils/validations";
import { profileSchema } from "../../Utils/profileValidation";
import ConfirmModal from "../../Components/Confirm/Confirm";

const UserInfo = () => {
    // Initial user data (typically this would come from an API)
    const initialUserData = {
        name: "",
        companyname: "",
        industry: "",
        phone: "",
        email: "",
        website: "",
        dob: "",
        googlemappins: "",
        emergencynumber: "",
        joiningdate: "",
        renewaldate: "",
    };

    const [userData, setUserData] = useState(initialUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [socialLinks, setSocialLinkes] = useState({ facebook: "", twitter: "", linkedin: "", instagram: "", github: "" });
    const [socialMedia, setSocialMedia] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ ...initialUserData });
    // Handle input changes
    const handleChange = (e: any) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
        console.log(e.target.name);
    };

    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Handle save action
    const handleSave = async (e: any) => {
        e.preventDefault();

        try {
            await profileSchema.validate(userData, { abortEarly: false });

            const res = await updateProfile({ ...userData, socialmedialinks: socialLinks });
            setIsEditing(false);
        } catch (err: any) {
            const validationErrors: any = {};
            if (err.inner) {
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
            }
            // User validation failed errors
            console.log(validationErrors);
            setError(validationErrors);
        }
    };

    // Handle delete actionf
    const handleDelete = async () => {
        setIsOpen(true);
    };

    const handleDeleteConfirm = async (arg: boolean) => {
        if (arg) {
            const res = await deleteProfile();
            if (res?.data?.success) {
                setUserData(initialUserData);
            }
            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
    };

    const handleSocialMediaChange = (e: any) => {
        setSocialMedia(e.target.value);
    };

    const handleLinkChange = (e: any) => {
        if (socialMedia == "") {
            toast.error("Please select a social media");
        } else {
            setSocialLinkes({ ...socialLinks, [socialMedia]: e.target.value });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await getProfile();
            console.log(res?.data?.data);
            if (res?.data?.data) {
                setUserData(res?.data?.data);
                setSocialLinkes(res?.data?.data?.socialmedialinks);
            }

            setLoading(false);
        };
        fetchData();
    }, []);

    // If the user data is deleted, show a placeholder message
    if (!userData) {
        return (
            <div className="bg-gradient-to-t from-gray-800 via-black to-gray-900 min-h-screen p-6 text-center">
                <h1 className="text-2xl font-semibold text-white">Profile Deleted</h1>
            </div>
        );
    }

    return loading ? (
        <Loading />
    ) : (
        <>
            {isOpen && <ConfirmModal isOpen={isOpen} handleDeleteConfirm={handleDeleteConfirm} />}

            <div className="bg-gradient-to-t from-gray-800 via-black to-gray-900 min-h-screen p-6">
                {/* User Info Form */}
                <main className="flex justify-center items-center py-12">
                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-3xl">
                        <h2 className="text-2xl font-semibold text-white mb-6">{isEditing ? "Edit Profile" : "View Profile"}</h2>

                        <form onSubmit={handleSave}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="text-white">Name</label> <br />
                                    {error.name && <span className="text-[red]">{error.name}</span>}
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label className="text-white">Company Name</label> <br />
                                    {error.companyname && <span className="text-[red]">{error.companyname}</span>}
                                    <input
                                        type="text"
                                        name="companyname"
                                        value={userData.companyname}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>

                                {/* Industry */}
                                <div>
                                    <label className="text-white">Industry</label> <br />
                                    {error.industry && <span className="text-[red]">{error.industry}</span>}
                                    <select
                                        name="industry"
                                        value={userData.industry}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    >
                                        <option value="">Select Industry</option>
                                        <option value="Tech">Tech</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Retail">Retail</option>
                                    </select>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-white">Phone Number</label> <br />
                                    {error.phone && <span className="text-[red]">{error.phone}</span>}
                                    <input
                                        type="number"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-white">Email</label> <br />
                                    {error.email && <span className="text-[red]">{error.email}</span>}
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>

                                {/* Website */}
                                <div>
                                    <label className="text-white">Website</label> <br />
                                    {error.website && <span className="text-[red]">{error.website}</span>}
                                    <input
                                        type="url"
                                        name="website"
                                        value={userData.website}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>

                                {/* DOB */}
                                <div>
                                    <label className="text-white">Date of Birth</label> <br />
                                    {error.dob && <span className="text-[red]">{error.dob}</span>}
                                    <input
                                        type="date"
                                        name="dob"
                                        value={userData.dob}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>

                                {/* Social Media Links */}
                                <div>
                                    <label className="text-white">Social Media Links</label>
                                    <div className="flex gap-4 mt-2">
                                        <select
                                            name="socialMediaPlatform"
                                            value={socialMedia}
                                            onChange={handleSocialMediaChange}
                                            disabled={!isEditing}
                                            className="p-3 bg-gray-700 rounded-md text-white w-40"
                                        >
                                            <option value="">Select Platform</option>
                                            <option value="facebook">Facebook</option>
                                            <option value="twitter">Twitter</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="github">GitHub</option>
                                        </select>

                                        <input
                                            type="text"
                                            name="socialMediaLink"
                                            value={socialLinks[`${socialMedia}`]}
                                            onChange={handleLinkChange}
                                            disabled={!isEditing}
                                            placeholder="Enter social media link"
                                            className="w-full p-3 bg-gray-700 rounded-md text-white"
                                        />
                                    </div>
                                </div>

                                {/* Google Map Pins */}
                                <div>
                                    <label className="text-white">Google Map Pins</label> <br />
                                    {error.googlemappins && <span className="text-[red]">{error.googlemappins}</span>}
                                    <input
                                        type="text"
                                        name="googlemappins"
                                        value={userData.googlemappins}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>

                                {/* Emergency Numbers */}
                                <div>
                                    <label className="text-white">Emergency Numbers</label>
                                    <br />
                                    {error.emergencynumber && <span className="text-[red]">{error.emergencynumber}</span>}
                                    <input
                                        type="number"
                                        name="emergencynumbers"
                                        value={userData.emergencynumber}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>

                                {/* Joining Date */}
                                <div>
                                    <label className="text-white">Joining Date</label> <br />
                                    {error.joiningdate && <span className="text-[red]">{error.joiningdate}</span>}
                                    <input
                                        type="date"
                                        name="joiningdate"
                                        value={userData.joiningdate}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>

                                {/* Renewal Date */}
                                <div>
                                    <label className="text-white">Renewal Date</label> <br />
                                    {error.renewaldate && <span className="text-[red]">{error.renewaldate}</span>}
                                    <input
                                        type="date"
                                        name="renewaldate"
                                        value={userData.renewaldate}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full mt-2 p-3 bg-gray-700 rounded-md text-white"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 flex justify-between">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2 bg-gray-500 text-white rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md">
                                            Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" onClick={toggleEdit} className="px-6 py-2 bg-blue-500 text-white rounded-md">
                                            Edit Profile
                                        </button>
                                        <button type="button" onClick={handleDelete} className="px-6 py-2 bg-red-500 text-white rounded-md">
                                            Delete Profile
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-4 bg-black text-center">
                    <p className="text-gray-300">&copy; {new Date().getFullYear()} Network Builder. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default UserInfo;
