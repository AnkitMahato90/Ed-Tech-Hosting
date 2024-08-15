import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../Common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="bg-white px-6 py-4 md:px-10 md:py-6 rounded-lg">
      <h1 className="mb-8 md:mb-14 text-2xl md:text-3xl font-medium text-richblack-900">
        My Profile
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 rounded-md border-[1px] border-richblack-700 bg-richblack-5 p-6 md:p-8 lg:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] md:w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-900">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-8 md:my-10 flex flex-col gap-y-6 md:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-5 p-6 md:p-8 lg:px-12">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-900">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-900"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-8 md:my-10 flex flex-col gap-y-6 md:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-5 p-6 md:p-8 lg:px-12">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-900">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex flex-col md:flex-row md:max-w-[500px] justify-between gap-y-6 md:gap-y-0">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 md:mb-2 text-sm text-richblack-600">
                First Name :
              </p>
              <p className="text-sm font-medium text-richblack-900">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-1 md:mb-2 text-sm text-richblack-600">Email :</p>
              <p className="text-sm font-medium text-richblack-900">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-1 md:mb-2 text-sm text-richblack-600">
                Gender :
              </p>
              <p className="text-sm font-medium text-richblack-900">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 md:mb-2 text-sm text-richblack-600">
                Last Name :
              </p>
              <p className="text-sm font-medium text-richblack-900">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-1 md:mb-2 text-sm text-richblack-600">
                Phone Number :
              </p>
              <p className="text-sm font-medium text-richblack-900">
                {user?.additionalDetails?.contactNumber ??
                  "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-1 md:mb-2 text-sm text-richblack-600">
                Date Of Birth :
              </p>
              <p className="text-sm font-medium text-richblack-900">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
