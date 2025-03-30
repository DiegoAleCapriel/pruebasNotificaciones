self.addEventListener('install', () => {
    console.log('Service Worker instalado.');
});

self.addEventListener('activate', () => {
    console.log('Service Worker activado.');
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'programarAlerta') {
        const { hora, minuto } = event.data;

        const ahora = new Date();
        const objetivo = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hora, minuto);

        if (objetivo < ahora) {
            objetivo.setDate(objetivo.getDate() + 1); // Programa para el día siguiente si ya pasó la hora
        }

        const tiempoRestante = objetivo - ahora;

        console.log(`Alerta programada en ${Math.round(tiempoRestante / 1000)} segundos.`);

        // Usa setTimeout para lanzar una notificación en el tiempo deseado
        setTimeout(() => {
            self.registration.showNotification("¡Llegó la hora!", {
                body: "Esta es una notificación enviada por el Service Worker.",
                icon: "/icon.png", // Ruta a un ícono (opcional)
                vibrate: [200, 100, 200] // Vibración en dispositivos compatibles
            });
        }, tiempoRestante);
    }
});
