import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        message: "Token d'authentification manquant",
        error: "Aucun token fourni"
      });
    }

    // Vérifier le format du token (Bearer <token>)
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        message: "Format de token invalide",
        error: "Token mal formaté"
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajouter l'ID de l'utilisateur à la requête
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Erreur d'authentification:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: "Token invalide",
        error: error.message
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Token expiré",
        error: "Le token a expiré"
      });
    }
    res.status(500).json({ 
      message: "Erreur d'authentification",
      error: error.message
    });
  }
};
