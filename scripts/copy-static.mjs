import fs from 'fs'
import path from 'path'

const root = process.cwd()
const srcStatic = path.join(root, '.next', 'static')
const dstStatic = path.join(root, '.next', 'standalone', '.next', 'static')
const srcPublic = path.join(root, 'public')
const dstPublic = path.join(root, '.next', 'standalone', 'public')

function exists(p) {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const e of entries) {
    const s = path.join(src, e.name)
    const d = path.join(dst, e.name)
    if (e.isDirectory()) {
      copyDir(s, d)
    } else {
      fs.copyFileSync(s, d)
    }
  }
}

if (exists(srcStatic)) {
  copyDir(srcStatic, dstStatic)
}

if (exists(srcPublic)) {
  copyDir(srcPublic, dstPublic)
}

