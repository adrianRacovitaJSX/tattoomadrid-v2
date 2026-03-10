import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import csv
import re
import time

def extract_urls(url):
    """
    Extrae todas las URLs de una página web.
    
    Args:
        url (str): La URL de la página web a analizar.
        
    Returns:
        list: Lista de URLs encontradas.
    """
    # Lista para almacenar todas las URLs encontradas
    all_urls = set()
    
    # Lista para almacenar URLs que ya hemos visitado
    visited_urls = set()
    
    # Lista de URLs que necesitamos visitar (comenzamos con la URL base)
    urls_to_visit = [url]
    
    # Analizamos solo URLs que pertenecen al mismo dominio
    base_domain = urlparse(url).netloc
    
    print(f"Extrayendo URLs de {url}")
    print(f"Dominio base: {base_domain}")
    
    try:
        # Primero analizamos detalladamente la página principal
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.google.com/'
        }
        
        print("Analizando la página principal...")
        response = requests.get(url, headers=headers, timeout=15)
        
        # Verificar el código de estado
        print(f"Código de estado: {response.status_code}")
        
        # Imprimir las cabeceras para diagnóstico
        print("Cabeceras de respuesta:")
        for header, value in response.headers.items():
            print(f"{header}: {value}")
        
        # Guardar los primeros 1000 caracteres del HTML para diagnóstico
        html_content = response.text
        print("\nPrimeros 1000 caracteres del HTML:")
        print(html_content[:1000])
        
        # Buscar enlaces usando diferentes métodos
        
        # 1. Usar BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Imprimir información de diagnóstico sobre elementos encontrados
        print(f"\nTotal de etiquetas encontradas: {len(soup.find_all())}")
        print(f"Total de etiquetas <a>: {len(soup.find_all('a'))}")
        print(f"Total de etiquetas <a> con href: {len(soup.find_all('a', href=True))}")
        
        # Encontrar enlaces con BeautifulSoup
        for link in soup.find_all('a', href=True):
            href = link['href']
            print(f"Enlace encontrado: {href}")
            
            # Convertimos URLs relativas a absolutas
            absolute_url = urljoin(url, href)
            
            # Añadimos la URL encontrada
            all_urls.add(absolute_url)
            
            # Si es del mismo dominio, añadimos para visitar
            if urlparse(absolute_url).netloc == base_domain:
                if absolute_url not in visited_urls:
                    urls_to_visit.append(absolute_url)
        
        # 2. Buscar URLs usando expresiones regulares como método alternativo
        # Encontrar enlaces absolutos (http/https)
        http_pattern = r'https?://[^\s"\'<>(){}]+\.[^\s"\'<>(){},]+'
        for match in re.finditer(http_pattern, html_content):
            found_url = match.group(0)
            print(f"URL encontrada con regex: {found_url}")
            all_urls.add(found_url)
            
            # Si es del mismo dominio, añadimos para visitar
            if urlparse(found_url).netloc == base_domain:
                if found_url not in visited_urls:
                    urls_to_visit.append(found_url)
        
        # 3. Buscar enlaces relativos
        relative_pattern = r'href=["\']([^"\']+)["\']'
        for match in re.finditer(relative_pattern, html_content):
            rel_url = match.group(1)
            if rel_url.startswith('#') or rel_url.startswith('javascript:'):
                continue
                
            absolute_url = urljoin(url, rel_url)
            print(f"URL relativa encontrada: {rel_url} -> {absolute_url}")
            all_urls.add(absolute_url)
            
            # Si es del mismo dominio, añadimos para visitar
            if urlparse(absolute_url).netloc == base_domain:
                if absolute_url not in visited_urls:
                    urls_to_visit.append(absolute_url)
        
        # Ahora visitamos el resto de URLs
        while urls_to_visit:
            # Tomamos la primera URL de la lista para visitar
            current_url = urls_to_visit.pop(0)
            
            # Verificamos si ya hemos visitado esta URL
            if current_url in visited_urls:
                continue
            
            # Añadimos la URL actual a la lista de visitadas
            visited_urls.add(current_url)
            
            print(f"Analizando: {current_url}")
            
            # Realizamos la solicitud HTTP
            try:
                # Esperamos un poco entre solicitudes para evitar ser bloqueados
                time.sleep(1)
                
                response = requests.get(current_url, headers=headers, timeout=10)
                
                # Verificamos si la solicitud fue exitosa
                if response.status_code != 200:
                    print(f"Error al acceder a {current_url}: Código de estado {response.status_code}")
                    continue
                
                # Parseamos el contenido HTML
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Encontramos todos los enlaces en la página
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    
                    # Convertimos URLs relativas a absolutas
                    absolute_url = urljoin(current_url, href)
                    
                    # Verificamos si la URL pertenece al mismo dominio
                    if urlparse(absolute_url).netloc == base_domain:
                        # Añadimos la URL a nuestro conjunto de todas las URLs
                        all_urls.add(absolute_url)
                        
                        # Si no hemos visitado esta URL, la añadimos a la lista para visitar
                        if absolute_url not in visited_urls:
                            urls_to_visit.append(absolute_url)
            
            except Exception as e:
                print(f"Error al procesar {current_url}: {str(e)}")
    
    except KeyboardInterrupt:
        print("\nExtracción interrumpida por el usuario.")
    except Exception as e:
        print(f"Error general: {str(e)}")
    
    # Convertimos el conjunto a una lista y la ordenamos
    all_urls_list = sorted(list(all_urls))
    
    return all_urls_list, visited_urls

def save_to_csv(urls, filename="urls_reactbits.csv"):
    """
    Guarda las URLs extraídas en un archivo CSV.
    
    Args:
        urls (list): Lista de URLs para guardar.
        filename (str): Nombre del archivo CSV.
    """
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['URL'])  # Encabezado
        for url in urls:
            writer.writerow([url])
    
    print(f"URLs guardadas en {filename}")

def main():
    # URL de la página a analizar
    target_url = "https://www.reactbits.dev/"
    
    # Extraemos las URLs
    all_urls, visited_urls = extract_urls(target_url)
    
    # Procesamos las URLs para quitar duplicados con y sin barra final
    processed_urls = set()
    for url in all_urls:
        # Normalizamos URLs (quitando barra final si existe)
        norm_url = url.rstrip('/')
        processed_urls.add(norm_url)
    
    processed_list = sorted(list(processed_urls))
    
    # Mostramos estadísticas
    print("\n" + "="*50)
    print(f"Total de URLs encontradas: {len(processed_list)}")
    print(f"Total de páginas visitadas: {len(visited_urls)}")
    
    # Guardamos las URLs en un archivo CSV
    save_to_csv(processed_list)
    
    # Mostramos las primeras 10 URLs encontradas
    print("\nPrimeras 10 URLs encontradas:")
    for i, url in enumerate(processed_list[:10], 1):
        print(f"{i}. {url}")

if __name__ == "__main__":
    main()