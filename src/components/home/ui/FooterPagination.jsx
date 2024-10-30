import { CardFooter, Button, Typography } from "@material-tailwind/react";

export function FooterPagination() {
    return(
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Pagina 1 of 1
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previa
          </Button>
          <Button variant="outlined" size="sm">
            Siguiente
          </Button>
        </div>
      </CardFooter>
    )
}
