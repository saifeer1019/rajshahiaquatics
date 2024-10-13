import { wixClientServer } from "@/lib/wixClientServer";
import { createClient, ApiKeyStrategy } from "@wix/sdk";

import { collections, products, stores } from "@wix/stores";


const Page = async () => {
    try {
        const myWixClient = createClient({
            auth: ApiKeyStrategy({
              apiKey: "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjM4OWI3MWJmLWJkMzYtNGRmOC04MjgxLTQzNzIzNTZmYWM5YlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImY5MWVkZTE2LTA1ZDQtNDM1Yi1iODZlLWMyZGY4YzM3NjExNFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIwNjgwNTg2OS0zMDZkLTRjNWEtOGU4MC03ZDM1NjBmNzM5ODNcIn19IiwiaWF0IjoxNzI4NzMzODQwfQ.e_UFZ3izMN46j4R-GtvefPjdoyPvungHYOpA63e_2enWdsItKnIY7sKMt8OrCejWz1sWplkZ4PJAs0VLb6HrR2dizlANjPPWydPWdk57DXKCspU2jNpXLqNTZS2xKRe2lMCD-bfTEgsIK_pYZP_QnzZ_K1EO56ZZ2-kbvYw_5QRDy7ctdM2omQu8RREbwhvcdD8YPlu00V2pNWVI_IqPm-pJ3J4tNW-KMF0TaMtTwCJmsVRcFV0fTr2oWMIsGLQUh-ZLjy5uUm44yN3FHfJKqzw3_AwiST0NF9HGVgRCqMnBCoqYNiA9z-8106ArVIFSucFxSzWGQEQ8yhG7lmaSFg",
              siteId: "5b9e4d0c-5e15-482c-9a66-bdb4a06a76be",
              accountId: "06805869-306d-4c5a-8e80-7d3560f73983",
            }),
            modules: {
             
              products
            },
          });
          
          // let productQuery = myWixClient.products.queryProducts()
          // const res = await productQuery.find();
  

        // Use the response variable, e.g., display product name
        return <div>{
                      res.items.map((product) => (
                        <div key={product._id}>{product._id}</div>
                      ))

        }
      </div>;
    } catch (error) {
        console.error("Error creating product:", error);




        return <div>Error creating product. Please try again.</div>;
    }
}

export default Page;
