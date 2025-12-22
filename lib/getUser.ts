import { cookies } from "next/headers";
import { User } from "@/modules/admin/types/user.type";
export async function getUserFromServer() {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");


  try {
    const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;
    const userRes = await fetch(`${apiUrl}/auth/me`, {
      headers: {
        Cookie: cookieString,
      },
      cache: "no-store",
      credentials: "include",
    });



    if (!userRes.ok) {
      return null;
    }
    let userData = {};
    try {
      userData = await userRes.json();
    } catch (parseError) {
      console.error("Error parsing userRes JSON:", parseError);
      return null;
    }

    const profileRes = await fetch(
      `${apiUrl}/user/me`,
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
        }
      } catch (error) {
        console.error("Error parsing profileRes JSON:", error);
      }
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
