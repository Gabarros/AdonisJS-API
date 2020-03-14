'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {

  async show({ params, response }){

    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try{
      if(!request.file('file')) return

      const upload = request.file('file', { size: '2mb' })

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if(!upload.move()){
        throw upload.error()
      }

      return response.status(201).send({ success: 'Arquivo enviado com sucesso'})
    }catch(err){

    }
  }
}

module.exports = FileController
