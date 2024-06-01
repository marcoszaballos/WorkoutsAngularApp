export const Constants = {
    BASE_URL: "http://mzrflix.duckdns.org:8183/phpBackend",

    GRUPO_MUSCULAR: "grupoMuscular",
    USER_EMAIL: "userEmail",
    
    GET_GRUPOS_MUSCULARES: "/getListaGruposMusculares.php",
    GET_LISTA_EJERCICIOS: "/getListaEjercicios.php",
    GET_EJERCICIOS_GRUPO_MUSCULAR: "/getEjercicioGrupoMuscular.php?grupoMuscular=",
    INSERT_EJERCICIOS_USUARIO: "/insertEjerciciosUsuario.php",
    GET_HISTORICO_EJERCICIOS_GROUP_BY_DATE: "/getHistoricoEjerciciosGroupByDate.php?userEmail=",
    GET_HISTORICO_EJERCICIOS_FILTER_BY_DATE: "/getHistoricoEjerciciosFilterByDate.php?fecha=",
    GET_FECHA_ULTIMO_ENTRENO_GRUPO_MUSCULAR: "/getFechaUltimoEntrenoGrupoMuscular.php?userEmail=",
    GET_FECHA_ULTIMO_ENTRENO_EJERCICIO: "/getFechaUltimoEntrenoEjercicio.php?",
    
    ERROR_INVALID_CREDENTIALS: "auth/invalid-credential",
    ERROR_INVALID_EMAIL: "auth/invalid-email",
    ERROR_WEAK_CREDENTIALS: "auth/weak-password",
    ERROR_EMAIL_IN_USE: "auth/email-already-in-use",
    ERROR_EMAIL_VACIO: "Debes informar el campo email"
  };
  