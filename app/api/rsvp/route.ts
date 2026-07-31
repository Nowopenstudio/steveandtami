import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from "@/env"

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { firstName, lastName, email, plusOne, guest } = body

  if (!firstName || !lastName || !email) {
    return Response.json({ error: "First name, last name, and email are required" }, { status: 400 })
  }

  if (plusOne && (!guest?.firstName || !guest?.lastName)) {
    return Response.json({ error: "Guest first and last name are required for a plus one" }, { status: 400 })
  }

  try {
    const settingsId = await writeClient.fetch(`*[_type == "settings"][0]._id`)

    if (!settingsId) {
      return Response.json({ error: "Settings document not found" }, { status: 500 })
    }

    await writeClient
      .patch(settingsId)
      .setIfMissing({ rsvp: [] })
      .append('rsvp', [{
        _type: 'single',
        _key: crypto.randomUUID(),
        firstName,
        lastName,
        email,
        plusOne: !!plusOne,
        ...(plusOne ? { guest: { firstName: guest.firstName, lastName: guest.lastName } } : {}),
      }])
      .commit()

    return Response.json({ success: true })
  } catch (err: any) {
    console.error("RSVP submission failed:", err)
    return Response.json({ error: "Failed to submit RSVP" }, { status: 500 })
  }
}
