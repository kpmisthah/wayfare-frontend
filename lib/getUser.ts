import { cookies } from "next/headers";
import { User } from "@/modules/admin/types/user.type";
export async function getUserFromServer() {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  console.log("Cookies from getUserFromServer:", cookieString);

  try {
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Cookie: cookieString,
      },
      cache: "no-store",
      credentials: "include",
    });
    
 

    if (!userRes.ok) {
      console.log(`Core user fetch failed with status: ${userRes.status}`);
      return null;
    }
    let userData = {};
    try {
      userData = await userRes.json();
      console.log(userData, "in lib===");
    } catch (parseError) {
      console.error("Error parsing userRes JSON:", parseError);
      return null;
    }

    const profileRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
      {
        headers: {
          Cookie: cookieString,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    let profileData = {};
    if (profileRes.ok) {
      try {
        const text = await profileRes.text();

        if (text) {
          profileData = JSON.parse(text);
        } else {
          console.log("Profile response body is empty");
        }
      } catch (error) {
        console.error("Error parsing profileRes JSON:", error);
      }
    } else {
      console.log(
        `User profile data not found or fetch failed with status: ${profileRes.status}`
      );
    }

    const completeUser = {
      ...profileData,
      ...userData,
    } as User;


    return completeUser;
  } catch (error) {
    console.error("An error occurred in getUserFromServer:", error);
    return null;
  }
}
