import { Response } from 'express'
import { AuthRequest } from '../middleware/admin.middleware'
import { query } from '../db/init'

// Get all homepage content
export const getAllContent = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('SELECT * FROM homepage_content ORDER BY section')

    res.json({ success: true, data: result.rows })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Get content by section
export const getContentBySection = async (req: AuthRequest, res: Response) => {
  try {
    const { section } = req.params

    const result = await query('SELECT * FROM homepage_content WHERE section = $1', [section])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Update content
export const updateContent = async (req: AuthRequest, res: Response) => {
  try {
    const { section, content_type, content_url, title, description, button_text, button_link } = req.body

    const result = await query(
      `INSERT INTO homepage_content (section, content_type, content_url, title, description, button_text, button_link)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (section) 
       DO UPDATE SET 
         content_type = EXCLUDED.content_type,
         content_url = EXCLUDED.content_url,
         title = EXCLUDED.title,
         description = EXCLUDED.description,
         button_text = EXCLUDED.button_text,
         button_link = EXCLUDED.button_link,
         updated_at = NOW()
       RETURNING *`,
      [section, content_type, content_url, title, description, button_text, button_link]
    )

    res.json({ success: true, data: result.rows[0] })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Delete content
export const deleteContent = async (req: AuthRequest, res: Response) => {
  try {
    const { section } = req.params

    await query('DELETE FROM homepage_content WHERE section = $1', [section])

    res.json({ success: true, message: 'Content deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

