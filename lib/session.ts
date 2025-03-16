import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

//This file creates and deletes session, which only takes place after the user has been authenticated in action.ts

//Creates a session cookie by storing JWT token & expiry date in a cookie
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    //Set secure to false, as safari wont allow cookie to be stored if using localhost
    secure: false,
    expires: expiresAt,
  });
}

//Gets ID and returns to whichever component
export async function getSessionUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value; // Retrieve the session token

  if (!sessionToken) {
    return null;
  }

  return decryptReturnUserId(sessionToken);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

//Function that takes
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

// Function to decrypt and extract userId from session
export async function decryptReturnUserId(
  session: string | undefined = ""
): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    // Ensure that the payload has the 'userId' field
    if (payload && typeof payload.userId === "string") {
      return payload.userId; // Return the userId from the decoded JWT
    } else {
      throw new Error("Invalid payload structure");
    }
  } catch (error) {
    console.log("Failed to verify session:", error);
    return null;
  }
}
