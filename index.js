        function generateQRCode() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError)
            } else {
                alert("Geolocation is not supported by this browser.")
            }
        }
        let shareLink

        function showPosition(position) {
            const latitude =/* 5.518690*/position.coords.latitude
            const longitude = /*5.737620*/position.coords.longitude
            const link = `https://www.google.com/maps?q=${latitude},${longitude}`
            document.getElementById("mapLink").href = link
            document.getElementById("mapLink").innerText = "View Location on Google Maps"
            document.getElementById("mapLink").style.display = "block"
            document.getElementById('share-btn').style.display = 'block'
            document.querySelector('.div').style.opacity = 1
            shareLink = link
            // console.log(latitude, longitude)
            // Generate QR Code
            const qrCodeContainer = document.getElementById("qrCode")
            qrCodeContainer.classList.add('canvas')
            qrCodeContainer.innerHTML = "" // Clear any previous QR code
            QRCode.toCanvas(qrCodeContainer, link, function (error) {
                if (error) console.error(error)
                //console.log('QR code generated!')
            });
        }

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.")
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.")
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.")
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.")
                    break;
            }
        }



        function shareLocation() {
            if (navigator.share) {
                navigator.share({
                    title: 'My Location',
                    text: 'Here is my current location:',
                    url: shareLink,
                })
                .then(() => console.log('Location shared successfully'))
                .catch((error) => console.error('Error sharing location:', error))
            } else {
                alert('Web Share API is not supported in your browser.')
            }
        }