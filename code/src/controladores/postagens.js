const knex = require('../conexao')

const novaPostagem = async (req, res) => {
    const { id } = req.usuario;
    const { texto, fotos } = req.body;

    if (!fotos || fotos.length === 0) {
        return res.status(404).json('Selecione uma foto para postagem.')
    }

    try {
        const postagem = await knex('postagens').insert({ texto, usuario_id: id }).returning('*');

        if (!postagem) {
            return res.status(400).json('Não foi possível compartilhar a sua publicação. Tente novamente.')
        }

        for (const foto of fotos) {
            foto.postagem_id = postagem[0].id;
        }

        const fotosCadastradas = await knex('postagem_fotos').insert(fotos);

        if (!fotosCadastradas) {
            await knex('postagens').where({ id: postagem[0].id }).del();
            return res.status(400).json('Não foi possível compartilhar a sua publicação. Tente novamente.')
        }

        return res.status(201).json('Publicação concluída.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const curtir = async (req, res) => {
    const { id } = req.usuario;
    const { postagem_id } = req.params;

    try {
        const postagem = await knex('postagens').where({ id: postagem_id }).first();

        if (!postagem) {
            return res.status(404).json('Publicação não encontrada.')
        }

        const jaCurtiu = await knex('postagem_curtidas').where({ usuario_id: id, postagem_id: postagem.id }).first();

        if (jaCurtiu) {
            return res.status(400).json('Não é possível curtir duas vezes a mesma publicação.')
        }

        const curtida = await knex('postagem_curtidas').insert({ usuario_id: id, postagem_id: postagem.id });

        if (!curtida) {
            return res.status(400).json('Não foi possível curtir a publicação.')
        }

        return res.status(200).json('Publicação curtida.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const comentar = async (req, res) => {
    const { id } = req.usuario;
    const { postagem_id } = req.params;
    const { texto } = req.body;

    if (!texto) {
        return res.status(404).json('Não é possível publicar um comentário vazio. Insira um texto para comentar na publicação.')
    }

    try {
        const postagem = await knex('postagens').where({ id: postagem_id }).first();

        if (!postagem) {
            return res.status(404).json('Publicação não encontrada.')
        }

        const comentario = await knex('postagem_comentarios').insert({ usuario_id: id, postagem_id: postagem.id, texto });

        if (!comentario) {
            return res.status(400).json('Não foi possível comentar na publicação.')
        }

        return res.status(200).json('Comentário publicado.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const feed = async (req, res) => {
    const { id } = req.usuario;
    const { offset } = req.query;

    const paginacao = offset ? offset : 0;

    try {
        const postagens = await knex('postagens').where('usuario_id', '<>', id).limit(10).offset(paginacao);

        if (postagens.length === 0) {
            return res.status(200).json(postagens)
        }

        for (const postagem of postagens) {

            const usuario = await knex('usuarios').where({ id: postagem.usuario_id }).select('imagem', 'username', 'verificado').first();
            postagem.usuario = usuario;

            const fotos = await knex('postagem_fotos').where({ postagem_id: postagem.id }).select('imagem');
            postagem.fotos = fotos;

            const curtidas = await knex('postagem_curtidas').where({ postagem_id: postagem.id }).select('usuario_id');
            postagem.curtidas = curtidas.length;

            postagem.curtidaPeloUsuario = curtidas.find(curtida => curtida.usuario_id === id) ? true : false;

            const comentarios = await knex('postagem_comentarios').leftJoin('usuarios', 'usuarios.id', 'postagem_comentarios.usuario_id')
                .where({ postagem_id: postagem.id }).select('usuarios.username', 'postagem_comentarios.texto');
            postagem.comentarios = comentarios;
        }

        return res.status(200).json(postagens)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = { novaPostagem, curtir, comentar, feed }
