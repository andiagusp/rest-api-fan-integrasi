const authorizationSupervisor = async (req, res, next) => {
  try {
    const { accessToken } = req
    const spv = "-"
    if (accessToken.npp_supervisor !== spv) {
      return res.status(403).json({
        success: false,
        message: 'forbbiden access you not supervisor'
      })
    }
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: error.message
    })
  }
}

module.exports = authorizationSupervisor
