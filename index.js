        function generateQRCode() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError)
                spinner.style.display = 'block';
                document.getElementById("mapLink").style.display = "block"
                document.querySelector('.div').style.opacity = 1
            } else {
                alert("Geolocation is not supported by this browser.")
                spinner.style.display = 'none'
            }
        }
        let shareLink
       
 
        function showPosition (position) {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            const link = `https://www.google.com/maps?q=${latitude},${longitude}`
            document.getElementById("mapLink").href = link
            document.getElementById("mapLink").innerText = "View Location on Google Maps"
             document.getElementById('share-btn').style.display = 'block'
            shareLink = link
            load(link)
            document.getElementById('btn').disabled = true
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

        let shareLocation = async () =>  {
       try{
            if(navigator.share) {
                navigator.share({
                    title: 'My Location',
                    text: 'Here is my current location:',
                    url: shareLink,
                })
            }
            else {
                alert('Web Share API is not supported in your browser.')
            }
        }
        catch{
            alert('Web Share API is not supported in your browser.')
        }
        }

        const load = async (link) => {
            const qrCodeContainer = document.getElementById("qrCode");
            const spinner = document.getElementById("spinner");
        
            qrCodeContainer.classList.add('canvas');
            qrCodeContainer.innerHTML = ""; // Clear any previous QR code
        
            const ctx = qrCodeContainer.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, qrCodeContainer.width, qrCodeContainer.height);
            }
        
            try {
                await QRCode.toCanvas(qrCodeContainer, link, function (error) {
                    if (error) console.error(error);
                });
            } catch (error) {
                console.error(error);
            } finally {
                // Hide the spinner after QR code generation is complete
                setTimeout(() => {
                  spinner.style.display = 'none'
                  document.getElementById('btn').disabled = false
                }, 100);
            }
        }